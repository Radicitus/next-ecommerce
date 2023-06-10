type Params = {
  id: string;
};

type SearchParams = {
  name: string;
  unit_amount: number | null;
  image: string;
  id: string;
  queryId?: string;
  description: string | null;
  features: string;
};

export type SearchParamType = {
  params: Params;
  searchParams: SearchParams;
};
