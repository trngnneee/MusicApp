import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const useWebsiteInfo = () => {
  const [websiteInfo, setWebsiteInfo] = useState<any>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/website-information`)
      .then(res => res.json())
      .then(data => {
        if (data.code == "success") {
          setWebsiteInfo(data.websiteInfo);
        }
      })
  }, [])

  useEffect(() => {
    if (websiteInfo?.favicon) {
      let linkElement = document.querySelector("link[rel*='icon']") as HTMLLinkElement;

      if (linkElement) {
        linkElement.href = websiteInfo.favicon;
      } else {
        linkElement = document.createElement('link');
        linkElement.rel = 'icon';
        linkElement.href = websiteInfo.favicon;
        document.head.appendChild(linkElement);
      }
    }

    // Set title
    if (websiteInfo?.name) {
      document.title = websiteInfo.name;
    }
  }, [websiteInfo]);

  return { websiteInfo };
}