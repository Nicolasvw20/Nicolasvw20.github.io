(async()=>{
  try{
    const style=document.createElement('style');
    style.textContent='@media(max-width:680px){.bottom-nav.mobile-only{display:flex}}';
    document.head.appendChild(style);
    const files=['app-part-1.txt','app-part-2.txt','app-part-3.txt','app-part-4.txt','app-part-5.txt','app-part-6.txt'];
    const parts=await Promise.all(files.map(async file=>{
      const response=await fetch(file,{cache:'no-cache'});
      if(!response.ok) throw new Error(`Unable to load ${file}`);
      return response.text();
    }));
    new Function(parts.join(''))();
  }catch(error){
    console.error(error);
    const box=document.createElement('div');
    box.style.cssText='margin:16px;padding:16px;border-radius:14px;background:#341822;color:#ffd6dd;font:14px system-ui';
    box.textContent='The app did not finish loading. Refresh the page while connected to the internet.';
    document.body.prepend(box);
  }
})();
