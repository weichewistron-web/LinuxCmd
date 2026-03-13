export interface CommandOption {
  flag: string;
  description: string;
}

export interface CommandExample {
  code: string;
  description: string;
}

export interface CommandDetail {
  name: string;
  description: string;
  category: string;
  syntax: string;
  options: CommandOption[];
  examples: CommandExample[];
}
