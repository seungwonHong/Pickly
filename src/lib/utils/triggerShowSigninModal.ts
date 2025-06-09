let showModalCallback: (() => void) | null = null;

export const setSigninModalCallback = (callback: () => void) => {
  showModalCallback = callback;
};

export const triggerShowSigninModal = () => {
  if (showModalCallback) {
    showModalCallback();
  } else {
    console.warn(
      "SigninModal callback not set. Redirecting to /signin directly."
    );
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
  }
};
