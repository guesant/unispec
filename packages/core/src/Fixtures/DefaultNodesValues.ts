export const UniNodeBaseFixtures = {
  defaultValues: {
    kind: "base",
  },
};

export const UniNodeTypeBaseFixtures = {
  defaultValues: {
    kind: "type",
    type: "unknown",
    nullable: false,
    required: true,
    description: "",
    default: undefined,
  },
};

export const UniDeclaratorFixtures = {
  defaultValues: {
    kind: "declarator",
    entity: "UnknownEntity",
  },
};
