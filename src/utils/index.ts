export function importScript(url: string, type = 'script') {
  return new Promise((resolve, reject) => {
    let script = document.getElementById(url) as HTMLScriptElement;

    if (script) {
      console.warn(url, '已经存在, 请勿重新加载');
      return resolve();
    }

    script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.id = url;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    (document.head || document.getElementsByTagName('head')[0]).appendChild(
      script,
    );
  });
}

export function importLink(url: string, type = 'script') {
  return new Promise((resolve, reject) => {
    let link = document.getElementById(url) as HTMLLinkElement;

    if (link) {
      console.warn(url, '已经存在, 请勿重新加载');
      return resolve();
    }

    link = document.createElement('link');
    link.href = url;
    link.type = 'text/javascript';
    link.id = url;
    link.onload = resolve;
    link.onerror = reject;
    (document.head || document.getElementsByTagName('head')[0]).appendChild(
      link,
    );
  });
}
