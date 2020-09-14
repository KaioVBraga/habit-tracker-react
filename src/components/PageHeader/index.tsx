import React from "react";

import { Link } from "react-router-dom";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";

interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="back" />
                </Link>
                <span 
                    style={{
                        fontFamily: 'Saira Semi Condensed',
                        fontSize: '2rem'
                    }}
                >
                    Habit Tracker
                </span>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {props.description && <p>{props.description}</p>}

                {props.children}
            </div>
        </header>
    );
};

export default PageHeader;
