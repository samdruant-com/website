interface Route {
  /**
   * The HTTP method of the route
   */
  method: "get" | "post" | "patch" | "delete";
  /**
   * The path of the route
   */
  path: string;
  
  /**
   * The handler of the route
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: any;

  /**
   * Whether or not the route requires authentication
   */
  protected?: boolean;

  /**
   * Configures the file-upload middleware for the route
   */
  upload?: {
    /**
     * The name of the field to be uploaded
     */
    field: string;
    /**
     * The maximum number of files to be uploaded
     */
    maxCount: number;
  };
}

export { Route };