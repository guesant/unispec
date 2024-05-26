export interface ICompileClassContext {
  meta: {
    mode?: string;
    gqlStrategy?: string;
  };
}

export interface ICompileClassHandlerCtorContext extends ICompileClassContext {
  className: string;
}
