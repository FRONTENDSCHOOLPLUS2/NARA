export interface BoardListData {
  ok: 1;
  item: [
    {
      _id: number;
      type: string;
      title: string;
      content: string;
      views: number;
      user: {
        _id: number;
        name: string;
        profile?: {
          originalname: string;
          name: string;
          path: string;
        };
      };
      createdAt: string;
      updatedAt: string;
      seller_id: string | null;
      extra: null;
      repliesCount: number;
      product?: {
        image: null;
      };
    }
  ];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BoardItemData {
  item: {
    _id: number;
    title: string;
    content: string;
    views: number;
    repliesCount: number;
    // createdAt: Date;
    createdAt: string;
    user: {
      name: string;
    };
  };
}

export interface BoardItemDataProps extends BoardItemData {
  type: string | undefined;
}
export interface BoardItemResponse {
  ok: 1;
  item: {
    _id: number;
    type: string;
    title: string;
    content: string;
    views: number;
    user: {
      _id: number;
      name: string;
      profile?: {
        originalname: string;
        name: string;
        path: string;
      };
    };
    createdAt: string;
    updatedAt: string;
    seller_id: string | null;
    replies: [
      {
        content: string;
        user: {
          _id: number;
          name: string;
          profile?: {
            originalname: string;
            name: string;
            path: string;
          };
        };
        id: number;
        createdAt: string;
        updatedAt: string;
      }
    ];
    extra: null;
  };
}

export interface NewBoardItemRespons {
  item: {
    _id: number;
  };
}

export interface CommentItemData {
  title?: string;
  content: string;
  // updatedAt: Date;
  updatedAt: string;
  _id: number | undefined;
  user: {
    _id: number;
    name: string;
    profile?: {
      originalname: string;
      name: string;
      path: string;
    };
  };
}

export type CommentItemResponse = {
  ok: 1;
  item: [
    {
      content: string;
      user: {
        _id: number;
        name: string;
        profile?: {
          originalname: string;
          name: string;
          path: string;
        };
      };
      _id: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type BoardListResponse = BoardItemDataProps[];
