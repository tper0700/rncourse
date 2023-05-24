/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTasksInput = {
  id?: string | null,
  title: string,
  description?: string | null,
};

export type ModelTasksConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTasksConditionInput | null > | null,
  or?: Array< ModelTasksConditionInput | null > | null,
  not?: ModelTasksConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Tasks = {
  __typename: "Tasks",
  id: string,
  title: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTasksInput = {
  id: string,
  title?: string | null,
  description?: string | null,
};

export type DeleteTasksInput = {
  id: string,
};

export type ModelTasksFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTasksFilterInput | null > | null,
  or?: Array< ModelTasksFilterInput | null > | null,
  not?: ModelTasksFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTasksConnection = {
  __typename: "ModelTasksConnection",
  items:  Array<Tasks | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionTasksFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTasksFilterInput | null > | null,
  or?: Array< ModelSubscriptionTasksFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type CreateTasksMutationVariables = {
  input: CreateTasksInput,
  condition?: ModelTasksConditionInput | null,
};

export type CreateTasksMutation = {
  createTasks?:  {
    __typename: "Tasks",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTasksMutationVariables = {
  input: UpdateTasksInput,
  condition?: ModelTasksConditionInput | null,
};

export type UpdateTasksMutation = {
  updateTasks?:  {
    __typename: "Tasks",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTasksMutationVariables = {
  input: DeleteTasksInput,
  condition?: ModelTasksConditionInput | null,
};

export type DeleteTasksMutation = {
  deleteTasks?:  {
    __typename: "Tasks",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetTasksQueryVariables = {
  id: string,
};

export type GetTasksQuery = {
  getTasks?:  {
    __typename: "Tasks",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTasksQueryVariables = {
  filter?: ModelTasksFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTasksQuery = {
  listTasks?:  {
    __typename: "ModelTasksConnection",
    items:  Array< {
      __typename: "Tasks",
      id: string,
      title: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTasksSubscriptionVariables = {
  filter?: ModelSubscriptionTasksFilterInput | null,
};

export type OnCreateTasksSubscription = {
  onCreateTasks?:  {
    __typename: "Tasks",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTasksSubscriptionVariables = {
  filter?: ModelSubscriptionTasksFilterInput | null,
};

export type OnUpdateTasksSubscription = {
  onUpdateTasks?:  {
    __typename: "Tasks",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTasksSubscriptionVariables = {
  filter?: ModelSubscriptionTasksFilterInput | null,
};

export type OnDeleteTasksSubscription = {
  onDeleteTasks?:  {
    __typename: "Tasks",
    id: string,
    title: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
