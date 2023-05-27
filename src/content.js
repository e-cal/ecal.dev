const logotext = "ecal.dev";

const meta = {
  title: "ecal.dev",
  description:
    "Ethan Callanan - I solve interesting problems. Director of Research at QMIND, building a brain-computer interface and leading three other AI research projects.",
};

const intro = {
  title: "Heyo, I'm Ethan",
  animated: {
    static: "I ",
    first: "write code",
    second: "am passionate about AI",
    third: "aspire to make sand think",
    final: "solve problems.",
  },
  description: {
    a: "Artificially intelligent, trying to reproduce on silicon.",
    b: "I'm a MASc candidate at Queen's University researching LLM capabilities and applications. Also currently working as a researcher in the Ingenuity Lab building financial and legal reasoning models with transformers.",
    c: "Open to contracting, if you're interested in a custom AI solution or consultation lets talk!",
  },
  img: "https://avatars.githubusercontent.com/u/47398876",
};

const about = {
  title: "Who am I?",
  img: "ethan_callanan.jpg",
  intro: "",
  story:
    "I am currently a MASc candidate researching LLM capabilities and applications with Prof. Zhu in the Ingenuity Lab at Queen's University. I am also working as a researcher in the lab, and do consulting/contract work building AI solutions. When I'm not working, I'm either tinkering away customizing my computer [iusearchbtw], playing around with the latest AI models or implementing them from scratch, cooking, or travelling!",
  cta: "Some highlights: I received the Vector AI Scholarship for my Masters education I've held various lead roles at QMIND, most recently the Director of Research. In my 3 years with QMIND I built a brain-computer interface game controller, a CV system for interacting with virtual assistants, as well as managed various client projects and taught members technical ML skills.\n I was a software / data engineer at Praxis Pioneering, where I built data analysis software and automated big data ETL pipelines for timeseries forecasting models informing decisions for a multi-billion dollar global media company.\n After my second year of undergrad [summer 2021] I was a research intern at the MuLab, where I built MACQ [a python library for action model acquisition], co-authored a research paper, and presented a workshop session at ICAPS 2022. ",
  resume: "https://github.com/e-cal/resume/raw/main/Ethan_Callanan_Resume.pdf",
  work: [
    {
      jobtitle: "Researcher",
      where: "Ingenuity Labs",
      date: "May 2023 - Sep 2023",
    },
    {
      jobtitle: "Director of Research",
      where: "QMIND",
      date: "Apr 2022 - Apr 2023",
    },
    {
      jobtitle: "Software/Data Engineer",
      where: "Praxis Pioneering",
      date: "Jun 2022 - Aug 2022",
    },
    {
      jobtitle: "Head of Data Science",
      where: "Arke News",
      date: "Dec 2021 - Aug 2022",
    },
    {
      jobtitle: "Director of Design [NLP]",
      where: "QMIND",
      date: "Apr 2021 - Apr 2022",
    },
    {
      jobtitle: "Research Intern",
      where: "MuLab",
      date: "May 2021 - Sep 2021",
    },
    {
      jobtitle: "Team Lead [CV; Attention Detection]",
      where: "QMIND",
      date: "Sep 2020 - Apr 2021",
    },
    {
      jobtitle: "Full-Stack Developer",
      where: "RYPM",
      date: "May 2020 - Oct 2020",
    },
  ],
};

const portfolio = [
  /*

bci  | vaad
macq | evim
prax | tm
nnfs | rypm
dots | bauhaus
     | website

vaad | nnfs
macq | evim
prax | rypm
dots | bauhaus
tm   | website
*/
  {
    img: "bci.jpg",
    title: "Brain-Computer Interface",
    description:
      "A brain-computer interface game controller. Uses signal processing and various ML classification techniques to detect blinks, allowing the user to play games by blinking. Built in just 5 weeks, yet we were able to achieve 94.4% CV accuracy for blink detection and live demoed the device at CUCAI 2023.",
    code: "https://github.com/e-cal/bci",
  },
  {
    img: "macq-trace.png",
    title: "MAcq",
    description:
      "The Model Acquisition Toolkit. The new standard library for all things model acquisition related in the field of automated planning. I co-authored and maintain this library. Initially built as part of my research internship at the MuLab, this project is largely comprised of translating the algorithms from related papers into code - an excellent way to learn!",
    code: "https://github.com/ai-planning/macq",
    paper:
      "https://icaps22.icaps-conference.org/workshops/KEPS/KEPS-22_paper_4962.pdf",
  },
  {
    img: "praxis.png",
    title: "Praxis Interface",
    description:
      "A data analysis tool built to help data scientists reason about data that evolves over time. Used internally by Praxis for financial forecasts of over $30B in transactional volume. More information available upon request.",
  },
  {
    img: "nnfs.png",
    title: "Neural Networks from Scratch",
    description:
      "As a learning exercise to really deepen my understanding of how my favorite algorithms work. I've found this has helped develop my intuition and comfortability working with neural networks greatly.",
    code: "https://github.com/e-cal/nn-from-scratch",
  },

  {
    img: "dotfiles-resized.png",
    title: "Dotfiles: Arch Linux",
    description:
      "A fully custom Arch linux setup. This has been my never ending passion project since 2020 christmas break. If I'm gonna use a computer everyday I may as well enjoy it right?!",
    code: "https://github.com/e-cal/dotfiles",
  },

  {
    img: "tm.png",
    title: "tmux Session Manager",
    description:
      "Manage multiple tmux sessions with ease and fly through the shell. By far the most useful script I have ever written, I seriously don't know how I lived before this.",
    code: "https://github.com/e-cal/dotfiles/blob/main/global/scripts/tm",
  },

  {
    img: "vaad.png",
    title: "Attention Detection",
    description:
      "A more human way of interfacing with virtual assistants. Uses CNNs to detect when you are speaking to a virtual assistant, allowing you to simply speak to your virtual assistant rather than shout its keyword. Awarded top paper at CUCAI 2021",
    code: "https://github.com/e-cal/VAAD",
    paper:
      "https://qmind.ca/static/media/VAAD%20Cucai%20Paper.5d296c6ade6451e73ec0.pdf",
  },

  {
    img: "evim.png",
    title: "Evim",
    description:
      "My personal neovim configuration. With >60 stars on github, my config offers a VSCode-like editing experience with all the advantages of vim's powerful keybinds and extensibility.",
    code: "https://github.com/e-cal/evim",
  },

  {
    img: "locm.png",
    title: "LOCM",
    description:
      "My undergraduate capstone project: implementing the LOCM model acquisition algorithm in MACQ.",
    paper: "https://mulab.ai/project/499-23-macq-locm/",
    code: "https://github.com/e-cal/macq",
  },

  {
    img: "rypm.png",
    title: "RYPM Web App",
    description:
      "A web-app built to modernize the client interactions and internal operations for Royal York Property Management.",
    site: "https://royalyorkpropertymanagement.ca/properties",
  },
  {
    img: "bauhaus.png",
    title: "Bauhaus",
    description:
      "An open-source Python package for creating propositional logic encodings from object-oriented Python code.",
    code: "https://github.com/QuMuLab/bauhaus",
  },
  {
    img: "website.png",
    title: "ecal.dev",
    description:
      "This website! Originally hosted on a raspberry pi on my desk [I've since moved to hosting it much more robustly], building this site and battling with nginx has been a great learning experience. Hope you like it!",
    code: "https://github.com/e-cal/ecal.dev",
  },
];

const contact = {
  email: "ethan@ecal.dev",
  phone: "+1 (289)-828-0702",
  // emailjs.com
  service_id: "service_zfyaj6h",
  template_id: "template_zhmxnfl",
  public_key: "VgC_4JXYWeNnwNnha",
};

const socials = {
  email: "mailto:ethan@ecal.dev",
  github: "https://github.com/e-cal",
  twitter: "https://twitter.com/ecal_v1",
  linkedin: "https://linkedin.com/in/ethan-callanan",
};
export { meta, about, portfolio, intro, contact, socials, logotext };
