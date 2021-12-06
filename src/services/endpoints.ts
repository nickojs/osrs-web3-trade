const baseRequest = { 
  duplicate: false
};

export enum EndPoints { 
  ITEMS = 'items',
}

export const searchRequest = (value: string): Record<string, unknown> => ({ 
  $text: { 
    $search: value
  },
  ...baseRequest
});

export const getSingleItem = (id: number): Record<string, unknown> => ({ 
  id,
  ...baseRequest
});
