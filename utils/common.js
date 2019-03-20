class RequestResponse {
    constructor (response) {
      return {
        success: response.success !== undefined ? response.success : true,
        statusCode: response.statusCode || 500,
        error: (response.error instanceof Error ? response.error.message : response.error) || null,
        data: response.data || null,
        meta: response.meta || null,
      }
    }
  }

module.exports = {
    RequestResponse
}