import React, { useEffect, useState } from "react";
import { FETCH_ABOUTUS } from "../GraphQL/Queries";
import ReactMarkdown from "react-markdown";
import { useQuery } from "@apollo/client";

import './AboutPage.css';
import Loader from "../components/Loader";

const AboutPage = () => {
	//Fetch the single-type Content from Strapi
	const [content, setContent] = useState(null);
	const { data } = useQuery(FETCH_ABOUTUS);

	useEffect(() => {
		if (data) {
			setContent(data.aboutPage);
		}
	}, [data, content]);

	//Render the array of core values to the screen
	const renderValues = () => {
		return content.data.attributes.corevalues.corevalue.map((value, index) => {
			return (
				<div className="value" key={index}>
					<h2>0{value.id}</h2>
					<div className="accent"></div>
					<h4>{value.value_name}</h4>
					<p>{value.value_desc}</p>
				</div>
			)
		})
	}

	if (content) {
		return (
			<div className="container">
				<div className="page-title">
					<h1>{content.data.attributes.pagetitle}</h1>
					<div className="divider"></div>
					<ReactMarkdown className="text-section">{content.data.attributes.text_section}</ReactMarkdown>
				</div>
				<div className="values-container">
					<h3>{content.data.attributes.secondtitle}</h3>
					<div className="divider"></div>
					<div className="values">
						{renderValues()}
					</div>
				</div>
			</div>
		)
	}
	return <Loader />
}

export default AboutPage;