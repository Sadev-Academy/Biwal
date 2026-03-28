export class ErrorService {
  /**
   * Log a runtime error with optional context
   */
  static async logError(error: unknown, context?: Record<string, unknown>) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[ErrorService] CRITICAL ERROR: ${errorMsg}`);
    if (context) {
      console.error(`[ErrorService] Context:`, JSON.stringify(context, null, 2));
    }
    
    // In production, send to Sentry:
    // Sentry.captureException(error, { extra: context });

    return true;
  }

  /**
   * Log an API error for monitoring
   */
  static async logApiError(path: string, status: number, message: string) {
    console.error(`[ErrorService] API ERROR | Path: ${path} | Status: ${status} | Message: ${message}`);
    return true;
  }
}
