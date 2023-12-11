const logotext = "ecal.dev";

const meta = {
    title: "ecal.dev",
    description:
        "Ethan Callanan - I solve interesting problems. Director of Research at QMIND, building a brain-computer interface and leading three other AI research projects.",
};

const intro = {
    title: "Ethan Callanan",
    animated: {
        static: "I ",
        first: "research AI",
        second: "train deep neural networks",
        third: "make sand think",
        final: "solve problems.",
    },
    description: {
        a: "Currently researching confidence and reliability of large language models in high-stakes domains. Building models that can be reliably calibrated with their own abilities and limitations.",
        b: "If you have an interesting AI project you think I could help on, lets talk! ",
        c: "Some stuff I've done so far:",
        d: "⪧ R&D helping a software development company break into the AI space, landing them a new large client",
        e: "⪧ Data engineering on massive enterprise projects, saving millions of dollars and discovering new insights",
        f: "⪧ Built a bespoke data analysis platform for experts in timeseries forecasting",
        g: "⪧ Wrote and maintain a first-of-its-kind open-source library for automated planning research",
    },
    img: "https://avatars.githubusercontent.com/u/47398876",
};

const about = {
    title: "Who am I?",
    img: "ethan_callanan.jpg",
    intro: "",
    story: "I'm a Masters student researching confidence and reliability in large language models under the supervision of Xiaodan Zhu at Queen's University. My current research is in collaboration with JP Morgan AI research, and our first paper together, \"Can GPT models be Financial Analysts?\", was featured by major news outlets like Bloomberg and Business Insider, and in AI/NLP communities like HuggingFace. Recipient of the Vector Scholarship in AI.",
    cta: "I'm interested in all things AI from deep learning to symbolic reasoning, and especially the intersection of AI domains. I build various AI projects in my free time, and recently have been working on some startup ideas. I find working on applying theory to real world products to be the best way to refine my skills and knowledge.",
    resume: "https://github.com/e-cal/resume/raw/main/Ethan_Callanan_Resume.pdf",
    work: [
        {
            jobtitle: "Research & Development",
            where: "RedBit Development",
            date: "May 2023 - present",
        },
        {
            jobtitle: "Researcher",
            where: "Ingenuity Labs",
            date: "May 2023 - present",
        },
        {
            jobtitle: "Director of Research",
            where: "QMIND (student org)",
            date: "Apr 2022 - Apr 2023",
        },
        {
            jobtitle: "Software Engineer",
            where: "Praxis Pioneering",
            date: "Jun 2022 - Aug 2022",
        },
        {
            jobtitle: "Research & Development",
            where: "Arke News (startup)",
            date: "Dec 2021 - Aug 2022",
        },
        {
            jobtitle: "Director of Design (NLP)",
            where: "QMIND (student org)",
            date: "Apr 2021 - Apr 2022",
        },
        {
            jobtitle: "Research Intern",
            where: "MuLab",
            date: "May 2021 - Sep 2021",
        },
        {
            jobtitle: "Team Lead (Computer Vision)",
            where: "QMIND (student org)",
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
        paper: "https://icaps22.icaps-conference.org/workshops/KEPS/KEPS-22_paper_4962.pdf",
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
        paper: "https://qmind.ca/static/media/VAAD%20Cucai%20Paper.5d296c6ade6451e73ec0.pdf",
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
