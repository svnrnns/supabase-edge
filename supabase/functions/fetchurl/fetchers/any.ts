import { fetchPageData } from '../utils/fetchersUtils.ts';
import { ProcessedResponse } from '../utils/types.ts';

export async function processAnyUrl(url: string): Promise<ProcessedResponse> {
  return await fetchPageData(url);
}
