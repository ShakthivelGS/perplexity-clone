export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  status?: "streaming" | "complete";
  sources?: Source[];
  goals?: Goal[];
  searchResults?: SearchResult[];
}

export interface Source {
  name: string;
  url: string;
  snippet?: string;
  citation?: number;
  domain?: string;
  status?: "REVIEWING" | "SELECTED";
}

export interface Goal {
  id: string;
  description: string;
  status?: string;
}

export interface SearchResult {
  url: string;
  name: string;
  status?: string;
}

export interface StreamChunk {
  answer?: string;
  chunks?: string[];
  goals?: Goal[];
  web_results?: Source[];
  search_results_block?: {
    rows?: Array<{
      web_result: Source;
      status: string;
      citation: number;
    }>;
    progress?: string;
  };
}
