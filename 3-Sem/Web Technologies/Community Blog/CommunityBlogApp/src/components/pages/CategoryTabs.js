import React, {useState} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import BlogPosts from './BlogPosts';

function SelectCategory(props) {

	const [selectedCategory, setSelectedCategory] = useState(props.category);
	console.log(props);
	console.log(selectedCategory);
	if(props.location !== undefined && props.location.state !== undefined)
	  console.log(props.location.state.category);
  

	const handleSelect = (key) => {
		console.log("Selected tab: " + key);
		setSelectedCategory(key);
		props.setCategory(key);
	}

	return (
		<div>
			<Tabs
				id="controlled-tab"
				defaultActiveKey={selectedCategory} 
				onSelect={handleSelect}
				variant='tabs'
			>
				<Tab eventKey={"Random"} title="Random"> 
					Random Blogs
					<BlogPosts selectedCategory="Random" />
				</Tab>
				<Tab eventKey={"Food"} title="Food"> 
					Food Blogs 
					<BlogPosts selectedCategory="Food" />
				</Tab>
				<Tab eventKey={"Music"} title="Music"> 
					Blogs on Music 
					<BlogPosts selectedCategory="Music" />
				</Tab>
				<Tab eventKey={"Movies"} title="Movies"> 
					Movies Blogs 
					<BlogPosts selectedCategory="Movies" />
				</Tab>
				<Tab eventKey={"Politics"} title="Politics"> 
					Blogs on Politics 
					<BlogPosts selectedCategory="Politics" />
				</Tab>
				<Tab eventKey={"Travel"} title="Travel"> 
					Travel Blogs 
					<BlogPosts selectedCategory="Travel" />
				</Tab>
			</Tabs>
		</div>
	);

	// const configTabs = {
	// 	tab: [
	// 		 	{ eventKey: "Random", title: "Random", content: "Random blogs" },
	// 		 	{ eventKey: "Food", title: "Food", content: "Food blogs" },
	// 			{ eventKey: "Music", title: "Music", content: "Blogs on Music" },
	// 			{ eventKey: "Movies", title: "Movies", content: "Movies blogs" },
	// 			{ eventKey: "Politics", title: "Politics", content: "Blogs on Politics" },
	// 			{ eventKey: "Travel", title: "Travel", content: "Travel blogs" },
	// 	  ]};

	// const createTabs = () => {
	// 	console.log("Create Tabs");
	// 	console.log(configTabs);
	// 	configTabs.map((ctab) => {
	// 		return(
	// 			<Tab eventKey={ctab.eventKey} title={ctab.title}> 
	//				{ctab.content} 
	//				<BlogPosts selectedCategory={ctab.title} />
	//			</Tab>
	// 		)
	// 	})
	// }


	// return (
	// 	<div>
	// 		<Tabs
	// 			id="controlled-tab"
	// 			defaultActiveKey={"Random"} 
	// 			onSelect={handleSelect}
	// 			variant='tabs'
	// 		>
	// 			{createTabs}
	// 		</Tabs>
	// 	</div>
	// );
}

export default SelectCategory;
