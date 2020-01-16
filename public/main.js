let n = 1;
nextPage.onclick = () => {
  if (n <= 2) {
    const request = new XMLHttpRequest();
    request.open("GET", `/page${n + 1}`);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          const array = JSON.parse(request.response);
          array.forEach(element => {
            const li = document.createElement("li");
            li.textContent = element.name;
            xxx.appendChild(li);
          });
        }
      }
    };
    n += 1;
    request.send();
  } else {
    alert("已经是最后一页了");
  }
};

getJSON.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "5.json");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        console.log(typeof request.response);
        //这里返回的是个string类型
        let obj;
        try {
          obj = JSON.parse(request.response);
        } catch (error) {
          console.log("出错了");
          console.log(error);
          obj = {};
        }
        //将字符串转成json对象，符合json语法的对象，如果不符合则抛出一个error对象
        console.log(obj);
        jsonName.textContent = obj.name;
      }
    }
  };
  request.send();
};
getXML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "4.xml");
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        console.log(request.responseXML);
        //request自带一个responseXML能把返回的内容转成dom对象
        const dom = request.responseXML;
        const text = dom.getElementsByTagName("warning")[0].textContent;
        console.log(text.trim());
      }
    }
  };
  request.send();
};

getCss.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/style.css");
  request.onload = () => {
    console.log("成功");
    const style = document.createElement("style");
    //请求成功后，创建一个script标签
    style.innerHTML = request.response;
    //写入请求的script内容
    document.head.appendChild(style);
    //将script插到head里
  };
  request.onerror = () => {
    console.log("失败");
  };
  request.send();
};
getJs.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/2.js");
  request.onload = () => {
    console.log("成功");
    const script = document.createElement("script");
    //请求成功后，创建一个script标签
    script.innerHTML = request.response;
    //写入请求的script内容
    document.body.appendChild(script);
    //将script插到body里
  };
  request.onerror = () => {
    console.log("失败");
  };
  request.send();
};
getHTML.onclick = () => {
  const request = new XMLHttpRequest();
  request.open("GET", "/3.html");
  //我们把onload改成onreadystatechange
  // new(0);open(1);send(2);startLoading(3);done(4)，一个5个状态码，当4说明下载完成
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      // console.log("html成功");
      if (request.status >= 200 && request.status < 300) {
        //request(response).status在[200,300)都是成功
        const div = document.createElement("div");
        //请求成功后，创建一个html标签
        div.innerHTML = request.response;
        //写入请求的div内容
        document.body.appendChild(div);
        //将div插到body里
      } else {
        alert("加载失败");
      }
    }
  };

  request.send();
};
