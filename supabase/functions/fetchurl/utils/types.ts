export interface ProcessedResponse {
  status: 'COMPLETED' | 'FAILED';
  requested_url: string;
  data: Record<string, any>;
}
