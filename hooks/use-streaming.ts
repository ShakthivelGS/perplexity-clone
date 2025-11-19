import { useState, useCallback } from "react";
import { Message, Source, Goal, SearchResult } from "@/lib/types";

const API_URL = "https://mock-askperplexity.piyushhhxyz.deno.net";

export function useStreaming() {
  const [isLoading, setIsLoading] = useState(false);

  const streamResponse = useCallback(
    async (
      question: string,
      onUpdate: (message: Partial<Message>) => void,
      onComplete: () => void
    ) => {
      setIsLoading(true);
      
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No reader available");
        }

        let buffer = "";
        let currentAnswer = "";
        let currentGoals: Goal[] = [];
        let currentSources: Source[] = [];
        let currentSearchResults: SearchResult[] = [];
        let allSearchResults = new Map<string, SearchResult>();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const data = JSON.parse(line.slice(6));
                
                // Parse blocks for different types of updates
                if (data.blocks) {
                  for (const block of data.blocks) {
                    // Handle text/answer updates
                    if (block.intended_usage === "ask_text" && block.diff_block?.field === "markdown_block") {
                      const patches = block.diff_block.patches;
                      for (const patch of patches) {
                        if (patch.path === "/answer") {
                          currentAnswer = patch.value;
                        }
                      }
                    }

                    // Handle goals/plan updates
                    if (block.intended_usage === "goals_block" && block.diff_block?.field === "goals_block") {
                      const patches = block.diff_block.patches;
                      for (const patch of patches) {
                        if (patch.op === "add" && patch.path.includes("/goals")) {
                          if (Array.isArray(patch.value)) {
                            currentGoals = patch.value.map((g: any, idx: number) => ({
                              id: idx.toString(),
                              description: g.description || g,
                            }));
                          }
                        } else if (patch.op === "replace" && patch.path.includes("/description")) {
                          const goalIndex = parseInt(patch.path.split("/")[2]);
                          if (currentGoals[goalIndex]) {
                            currentGoals[goalIndex].description = patch.value;
                          }
                        }
                      }
                    }

                    // Handle search results - track URLs being crawled
                    if (block.intended_usage === "search_results" && block.diff_block?.field === "search_results_block") {
                      const patches = block.diff_block.patches;
                      for (const patch of patches) {
                        if (patch.path === "/rows" || patch.path.includes("/rows")) {
                          if (Array.isArray(patch.value)) {
                            patch.value.forEach((row: any) => {
                              const url = row.web_result?.url;
                              if (url) {
                                allSearchResults.set(url, {
                                  url: url,
                                  name: row.web_result.name || url,
                                  status: row.status || "REVIEWING",
                                });
                              }
                            });
                          } else if (patch.value?.web_result) {
                            const url = patch.value.web_result.url;
                            if (url) {
                              allSearchResults.set(url, {
                                url: url,
                                name: patch.value.web_result.name || url,
                                status: patch.value.status || "REVIEWING",
                              });
                            }
                          }
                          currentSearchResults = Array.from(allSearchResults.values());
                        }
                        
                        // Update status of existing results
                        if (patch.op === "replace" && patch.path.includes("/status")) {
                          const rowIndex = parseInt(patch.path.split("/")[2]);
                          const results = Array.from(allSearchResults.values());
                          if (results[rowIndex]) {
                            allSearchResults.set(results[rowIndex].url, {
                              ...results[rowIndex],
                              status: patch.value,
                            });
                            currentSearchResults = Array.from(allSearchResults.values());
                          }
                        }

                        // Extract final sources (SELECTED ones)
                        if (patch.path === "/rows" && Array.isArray(patch.value)) {
                          const selectedSources = patch.value
                            .filter((row: any) => row.status === "SELECTED")
                            .map((row: any, idx: number) => ({
                              name: row.web_result?.name || "",
                              url: row.web_result?.url || "",
                              snippet: row.web_result?.snippet || "",
                              citation: row.citation || idx + 1,
                              domain: row.web_result?.meta_data?.citation_domain_name || "",
                              status: row.status,
                            }));
                          if (selectedSources.length > 0) {
                            currentSources = selectedSources;
                          }
                        }
                      }
                    }
                  }

                  // Send update with all current data
                  onUpdate({
                    content: currentAnswer,
                    goals: currentGoals.length > 0 ? currentGoals : undefined,
                    sources: currentSources.length > 0 ? currentSources : undefined,
                    searchResults: currentSearchResults.length > 0 ? currentSearchResults : undefined,
                    status: "streaming",
                  });
                }

                // Check if streaming is complete
                if (data.message_mode === "FULL" || data.final_sse_message) {
                  onUpdate({
                    content: currentAnswer,
                    goals: currentGoals.length > 0 ? currentGoals : undefined,
                    sources: currentSources.length > 0 ? currentSources : undefined,
                    searchResults: undefined, // Hide search results when done
                    status: "complete",
                  });
                  onComplete();
                }
              } catch (e) {
                console.error("Error parsing SSE data:", e);
              }
            }
          }
        }
      } catch (error) {
        console.error("Streaming error:", error);
        onUpdate({
          content: "Sorry, I encountered an error. Please try again.",
          status: "complete",
        });
        onComplete();
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { streamResponse, isLoading };
}
