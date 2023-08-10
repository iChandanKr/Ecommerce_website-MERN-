import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const About = () => {
    const githubLink = () => {
        window.location = "https://github.com/iChandanKr";
    };
    return (
        <div className="aboutSection">
            <div></div>
            <div className="aboutSectionGradient"></div>
            <div className="aboutSectionContainer">
                <Typography component="h1">About Us</Typography>

                <div>
                    <div>
                        <Avatar
                            style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                            src="https://res.cloudinary.com/dvu175cd5/image/upload/v1691666559/avatars/dqt2yhwckdnrvyxgvkzu.jpg"
                            alt="Founder"
                        />
                        <Typography>Chandan Kumar</Typography>
                        <Button onClick={githubLink} color="primary">
                            iChandanKr
                        </Button>
                        <span>
                            This is a Ecommerce wesbite made by @iChandanKr . Only with the
                            purpose to learn MERN Stack Development.
                        </span>
                    </div>
                    <div className="aboutSectionContainer2">
                        <Typography component="h2">Follow Me</Typography>
                        <a
                            href="https://github.com/iChandanKr"
                            target="blank"
                        >
                          
                            <GitHubIcon className="githubSvgIcon"/>
                        </a>

                        <a href="https://www.linkedin.com/in/chandan-kumar-0ab518212" target="blank">
                            <LinkedInIcon className="linkedInSvgIcon" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;