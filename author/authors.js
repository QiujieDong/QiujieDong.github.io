(function () {
  // data-authors format in index.html: "author_id,author_id^*d"
  // ^* => equal contribution, ^d => corresponding author.
  const AUTHOR_REGISTRY = Object.freeze({
    qiujie_dong: { name: "Qiujie Dong", url: "https://qiujiedong.github.io/", highlight: true, noLink: true },
    rui_xu: { name: "Rui Xu", url: "https://ruixu.me/" },
    tianyang_xue: { name: "Tianyang Xue", url: "https://xty.im/" },
    le_wan: { name: "Le Wan", url: null },
    zhe_zhu: { name: "Zhe Zhu", url: "https://scholar.google.com/citations?user=pM4ebg0AAAAJ&hl=en" },
    peng_li: { name: "Peng Li", url: "https://penghtyx.github.io/yuki-lipeng" },
    zhiyang_dou: { name: "Zhiyang Dou", url: "https://frank-zy-dou.github.io/" },
    cheng_lin: { name: "Cheng Lin", url: "https://clinplayer.github.io/" },
    shiqing_xin: { name: "Shiqing Xin", url: "http://irc.cs.sdu.edu.cn/~shiqing/index.html" },
    yuan_liu: { name: "Yuan Liu", url: "https://liuyuan-pal.github.io/" },
    wenping_wang: { name: "Wenping Wang", url: "https://engineering.tamu.edu/cse/profiles/Wang-Wenping.html" },
    taku_komura: { name: "Taku Komura", url: "https://www.cs.hku.hk/index.php/people/academic-staff/taku" },
    jiepeng_wang: { name: "Jiepeng Wang", url: "https://jiepengwang.github.io/" },
    zichun_zhong: { name: "Zichun Zhong", url: "https://zichunzhong.github.io/" },
    xin_li: { name: "Xin Li", url: "https://people.tamu.edu/~xinli/" },
    changhe_tu: { name: "Changhe Tu", url: "http://irc.cs.sdu.edu.cn/~chtu/index.html" },
    leif_kobbelt: { name: "Leif Kobbelt", url: "https://www.graphics.rwth-aachen.de/person/3/" },
    scott_schaefer: { name: "Scott Schaefer", url: "https://people.engr.tamu.edu/schaefer/index.html" },
    pengfei_wang: { name: "Pengfei Wang", url: "https://faculty.sdu.edu.cn/~zeU3Eb/zh_CN/index.htm" },
    fangtian_liang: { name: "Fangtian Liang", url: "https://www.igiplab.com/members/217" },
    hao_pan: { name: "Hao Pan", url: "https://haopan.github.io/" },
    lei_yang: { name: "Lei Yang", url: "https://leiyangjustin.github.io/" },
    congyi_zhang: { name: "Congyi Zhang", url: "https://cong-yi.github.io/" },
    guying_lin: { name: "Guying Lin", url: "https://carrie-lin.github.io/" },
    caiming_zhang: { name: "Caiming Zhang", url: "https://ieeexplore.ieee.org/author/37533371200" },
    yuanfeng_zhou: { name: "Yuanfeng Zhou", url: "https://scholar.google.com/citations?user=zJNjKEcAAAAJ&hl=en" },
    alla_sheffer: { name: "Alla Sheffer", url: "https://www.cs.ubc.ca/~sheffa/" },
    huibiao_wen: { name: "Huibiao Wen", url: "https://huibiaowen.github.io/" },
    shuangmin_chen: { name: "Shuangmin Chen", url: "https://ieeexplore.ieee.org/author/37088955375" },
    jiaran_zhou: { name: "Jiaran Zhou", url: "https://jiaranzhou.github.io/" },
    runqiao_li: { name: "Runqiao Li", url: null },
    xiaohong_jia: { name: "Xiaohong Jia", url: "http://www.mmrc.iss.ac.cn/~xhjia/" },
    junjie_gao: { name: "Junjie Gao", url: "https://scholar.google.com/citations?user=CTDs13EAAAAJ&hl" },
    qiong_zeng: { name: "Qiong Zeng", url: "https://qiongzn.github.io/" },
    ruian_wang: { name: "Ruian Wang", url: null },
    xiaoran_gong: { name: "Xiaoran Gong", url: "https://github.com/gongxiaoran" },
    zixiong_wang: { name: "Zixiong Wang", url: "https://bearprin.com/" },
    pengshuai_wang: { name: "Pengshuai Wang", url: "https://wang-ps.github.io/" },
    manyi_li: { name: "Manyi Li", url: "https://manyili12345.github.io/" },
    zhenyu_shu: { name: "Zhenyu Shu", url: "https://ieeexplore.ieee.org/author/37086874041" },
    xuedong_he: { name: "Xuedong He", url: "https://scholar.google.com/citations?user=Jll9EQYAAAAJ&hl" },
    haiyan_ge: { name: "Haiyan Ge", url: null },
    qin_liu: { name: "Qin Liu", url: null },
    aifu_han: { name: "Aifu Han", url: "https://scholar.google.com/citations?user=mECfaHkAAAAJ&hl" },
    shengzong_zhou: { name: "Shengzong Zhou", url: "https://orcid.org/0009-0002-3623-5568" },
      dafei_qin: { name: "Dafei Qin", url: "https://dafei-qin.github.io/" },
      kaichun_qiao: { name: "Kaichun Qiao", url: "https://dolphinqiao.github.io/" },
      huaijin_pi: { name: "Huaijin Pi", url: "https://phj128.github.io/" },
      qixuan_zhang: { name: "Qixuan Zhang", url: "https://scholar.google.com/citations?user=YvwsqvYAAAAJ&hl=zh-CN" },
      longwen_zhang: { name: "Longwen Zhang", url: "https://zhanglongwen.com/" },
      lan_xu: { name: "Lan Xu", url: "http://xu-lan.com/" },
      jingyi_yu: { name: "Jingyi Yu", url: "https://www.yu-jingyi.com/" },
  });

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatNote(noteCode) {
    if (!noteCode) {
      return "";
    }

    const symbols = [];
    for (const ch of noteCode.trim()) {
      if (ch === "*") {
        symbols.push("*");
      } else if (ch.toLowerCase() === "d") {
        symbols.push("&dagger;");
      } else {
        symbols.push(escapeHtml(ch));
      }
    }

    if (!symbols.length) {
      return "";
    }

    return `<sup>${symbols.join(",")}</sup>`;
  }

  function parseAuthorToken(token) {
    const trimmed = token.trim();
    if (!trimmed) {
      return null;
    }

    const sepIndex = trimmed.indexOf("^");
    if (sepIndex === -1) {
      return { id: trimmed, note: "" };
    }

    return {
      id: trimmed.slice(0, sepIndex).trim(),
      note: trimmed.slice(sepIndex + 1).trim()
    };
  }

  function renderAuthor(author, noteCode) {
    const safeName = escapeHtml(author.name);
    let content = safeName;

    if (author.url && !author.noLink) {
      content = `<a href="${escapeHtml(author.url)}" target="_blank" rel="noopener">${safeName}</a>`;
    }

    if (author.highlight) {
      content = `<strong style="font-size:18px;">${content}</strong>`;
    }

    return `${content}${formatNote(noteCode)}`;
  }

  function renderAuthorList(tokenString) {
    return tokenString
      .split(",")
      .map(parseAuthorToken)
      .filter(Boolean)
      .map((token) => {
        const author = AUTHOR_REGISTRY[token.id];
        if (!author) {
          console.warn("[authors] Unknown author id:", token.id);
          return `${escapeHtml(token.id)}${formatNote(token.note)}`;
        }

        return renderAuthor(author, token.note);
      })
      .join(", ");
  }

  function renderPublicationAuthors(root = document) {
    const containers = root.querySelectorAll(".publication-authors[data-authors]");
    containers.forEach((container) => {
      const tokenString = container.getAttribute("data-authors") || "";
      const rendered = renderAuthorList(tokenString);
      container.innerHTML =
        '<span itemscope itemprop="author" itemtype="http://schema.org/Person"><span itemprop="name">' +
        rendered +
        "</span></span>";
    });
  }

  window.PublicationAuthors = {
    registry: AUTHOR_REGISTRY,
    render: renderPublicationAuthors
  };

  document.addEventListener("DOMContentLoaded", function () {
    renderPublicationAuthors(document);
  });
})();