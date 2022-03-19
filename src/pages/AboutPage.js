import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_ABOUTUS } from "../GraphQL/Queries";
import ReactMarkdown from "react-markdown";
import './AboutPage.css';

const AboutPage = () => {
	const [content, setContent] = useState([]);
	const { data } = useQuery(FETCH_ABOUTUS);

	useEffect(() => {
		if (data) {
			setContent(data);
			console.log(content);
		}
	}, [data, content])

	const renderValues = () => {
		return content.aboutPage.data.attributes.corevalues.corevalue.map((value, index) => {
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
					<h1>{content.aboutPage.data.attributes.pagetitle}</h1>
					<div className="divider"></div>
					<ReactMarkdown className="text-section">{content.aboutPage.data.attributes.text_section}</ReactMarkdown>
				</div>
				<div className="values-container">
					<h3>{content.aboutPage.datas.attributes.secondtitle}</h3>
					<div className="divider"></div>
					<div className="values">
						{renderValues()}
					</div>
				</div>
			</div>
		)
	}
	return (
		<div>There was an error</div>
	)
}

export default AboutPage;