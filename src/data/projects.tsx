import React from "react";
import { Link } from "gatsby";

export const projects = [
    {
        category: "AI / ML",
        projects: [
            {
                title: "Virtual Assistant Attention Detection",
                description: (
                    <div>
                        <p>
                            I lead a team to explore the use of computer vision
                            for human attention detection. We developed models
                            for face detection and attention classification, and
                            built an application to use the models as the
                            activation mechanism for a custom virtual assistant.
                        </p>
                        <p>
                            We presented our work at the Canadian Undergraduate
                            Conference on Artificial Intelligence (CUCAI 2021)
                            and published an{" "}
                            <Link to="https://cucai.ca/CUCAI_2021_Proceedings.pdf">
                                award winning paper
                            </Link>
                            through the conference proceedings. This was my
                            first time as the lead on a technical project, and I
                            learned a ton about both computer vision and project
                            management in the process.
                        </p>
                    </div>
                ),
                tools: ["Python", "Pytorch", "Google Cloud"],
                images: [],
                imageContentStyle: { backgroundPosition: "top right" },
                link: "https://www.youtube.com/watch?v=0-YFEVMPsV8",
            },
        ],
    },
];
