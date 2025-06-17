export {};

declare global {
  interface Window {
    Kakao: KakaoNamespace;
  }

  interface KakaoNamespace {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Share: {
      sendDefault: (options: KakaoDefaultShareOptions) => void;
    };
  }

  interface KakaoDefaultShareOptions {
    objectType: "feed";
    content: {
      title: string;
      description: string;
      imageUrl: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    };
    itemContent?: {
      profileText?: string;
      profileImageUrl?: string;
      titleImageUrl?: string;
      titleImageText?: string;
      titleImageCategory?: string;
      items?: Array<{ item: string; itemOp: string }>;
      sum?: string;
      sumOp?: string;
    };
    social?: {
      likeCount?: number;
      commentCount?: number;
      sharedCount?: number;
      viewCount?: number;
      subscriberCount?: number;
    };
    buttons?: Array<{
      title: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    }>;
    installTalk?: boolean;
    callback?: () => void;
  }
}
