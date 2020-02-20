# Belarus-OCDS-Transformation-and-Analytics

## EBRD GPA TC Facility – Support in Accession to the Agreement on Government Procurement of the World Trade Organization. Assignment: Belarus: Public Procurement Reporting Module for the National eProcurement System/s.
<p>
  
### Lead Organisation: 
Ministry of Antimonopoly Regulation and Trade; European Bank for Reconstruction and Development (EBRD)	
Location: Belarus

### Problem Statement: 
Belarus had several digital public procurement platforms, however the information generated through them and stored was not standardised, making analysis challenging and hindering data-driven decision making. The presence of multiple non-standardised digital procurement platforms led to issues with data duplication and data quality. In addition, the approach to public procurement reporting was not automated, and was neither efficient nor reliable. 

### Description: 
Data is extracted from the existing public procurement platforms, which continue to operate, and transformed to the Open Contracting Data Standard (OCDS). This data is consolidated in a single database, and a business intelligence module is run on top of it, accessing the data via an Application Programme Interface (API). This provides government procurement policy makers with a tool to analyse and visualise procurement trends. The data is also made accessible via an open data portal, ensuring transparency of public spending. 

### Lessons learnt:
* 1. The underlying quality of the data is a key determinant of success  – impacting the costs of the data transformation and the accuracy of the public procurement statistics generated; 
* 2. Projects should be designed in several phases, giving time for the government to make changes on the basis of the initial business intelligence tools developed; 3. To ensure take-up and proper use of the developed tools, a budget for training and outreach should be included. 

### Impact: 

* Enables public procurement policy makers to take data-driven decisions; 
* Provides for the automated generation of public procurement reports; Ensures transparency of public spending.

### Human resources: 
Project implemented by EBRD and 3 IT/consulting contractors, providing expertise in business intelligence software, web applications, and data analysis.	

### Risks: 
Gaining adequate access to public procurement data and systems required for the project, together with the expertise to understand these systems. Potential for political blocks to the project.

### Other requirements: 
The project requires existing digital procurement platforms from which to extract and then transform data. Similar project can be implemented building on a wide range (in terms of quality and type) of such procurement platforms.

### Project timeline:
2018 – 2019	
### Project status: 
Fully deployed

## Context and problem statement
<p>
As of 2016, The Republic of Belarus was negotiating its accession to the World Trade Organisation (WTO) as a priority. One element of this is the adoption of the WTO’s Agreement on Government Procurement (GPA) – which aims to open Government procurement markets to signatory countries. In order to comply with the GPA, Belarus requested support from the European Bank for Reconstruction and Development’s (EBRD) GPA Technical Cooperation Facility to help modernise its public procurement system.  
<p>
The Republic of Belarus has several existing, well-functioning electronic public procurement solutions that deliver semi-automated processes. However, these solutions are spread across several different systems and organisations:
  
*	A public procurement marketplace operated by the National Centre of Marketing 
*	A public procurement marketplace operated by the Belarusian Universal Commodity Exchange 
*	A publication centre for procurement information (purchases made) operated by the National Centre of Marketing. This publication centre publishes procurement data generated through both of the marketplaces mentioned above.
<p>
A separate organisation, the Ministry of Antimonopoly Regulation and Trade has responsibility for state policy on the public procurement of goods and services. Despite the presence of the eProcurement systems described above, the Ministry faced a number of challenges related to them and did not systematically make use of procurement data to inform its public procurement policies. The problems experienced included:
  
*	Information on procurement procedures and contracts was difficult to retrieve;
*	Public procurement data had no standardised structure, making analysis challenging;
*	Lack of availability of transactional data;
*	Approach to procurement reporting was inefficient, unreliable and time-consuming;
*	Inconsistent data quality and duplicate data entries, driven also by the high costs of maintaining software, servers and hardware for multiple data repositories.

## Objectives and vision
Working with the EBRD GPA Technical Cooperation Facility, the Ministry of Antimonopoly Regulation and Trade aimed to modernise its public procurement system, ensuring it can draw on the data stored within its national eProcurement marketplaces to drive improved public procurement policies and decisions. It aimed to: 

*	Provide improved public procurement statistics to guide decision making;
*	Generate automated public procurement reports;
*	Provide transparency on public spending for citizens.

The EBRD-developed vision to achieve these objectives contains two primary points:

*	Implementation of an open contracting data standard (OCDS) transformation on existing eProcurement data;
*	Deployment of an OCDS-based set of business intelligence and reporting tools to enable analysis of public procurement data, and ensure transparency towards citizens and businesses.

## Technological solution and implementation

The developed solution extracts data from the existing eProcurement systems and converts it to the OCDS standard while allowing the legacy solutions to continue running unaffected. Once the data has been converted to the OCDS it is consolidated in one database. Two reporting modules – one for public authorities and one for the general public – have been set up, which access this data directly through an API. These modules allow users to analyse the eProcurement data and view it through a number of different angles and filters. The overall result is a publicly accessible contract register together with the business intelligence tools to dig into and analyse the contract data.

## Data extraction and transformation

The data drawn upon is extracted in the following ways:

1) Directly from the eProcurement system of the National Centre of Marketing
2) Data from the eProcurement system of the Belarus Universal Commodity Exchange is sent for publication to the Publication centre for procurement data of the National Centre of Marketing. The data is extracted from the publication centre. 
Direct extraction from the Belarus Universal Commodity Exchange eProcurement system would have been preferable, however the project team was not granted direct access to this data.
3) Middleware is used to extract this data, convert it to the OCDS and store it in a consolidated database. 

The process of developing this data extraction and transformation system has a number of steps. First, there is a systems exploration stage. During this stage, the project team describes the processes by which the eProcurement systems operate, it conducts a technical analysis of these business processes and models them using business process modelling notation (bpmn). 

Following this, an analysis of the system database is conducted in order to understand how it operates, to assess the quality and consistency of the data, and to judge how best to extract the data. Following this, a business analysis is conducted in order to map the data in the database onto the OCDS standard. 

Once these analytical phases are complete, the project team develops the APIs through which the data is extracted from the live eProcurement systems and those through which the data is made available for the business intelligence tools also developed.
Data analytics and transparency tools

The EBRD provides a pre-defined set of dashboards which provide different analytical angles through which the OCDS data can be viewed. These dashboards provide a breakdown between different stages, processes and markets. Aspects such as the number of complaints and challenges, purchases made by a particular public entity, or the number of successful procurement procedures completed can be measured. The data to be examined at different levels of detail, ranging from an overview of the functioning of the procurement system, to data on individual public procurers or tenderers.

Drawing on these dashboards, two separate data analytics tools have been provided. The first, “Explorer”, is built for public procurement analysts within the Ministry of Antimonopoly Regulation and Trade as well as other public administrations, and is intended to support their decision-making. The Ministry makes use of Qlik Business Intelligence software in order to view the “Explorer” data. The standard set of dashboards provided by the EBRD was tailored according to the needs of the Ministry and according to the nature and quality of the data available. The Ministry is able to further develop its own aspects to measure and visualise according to their priorities. Using the “Explorer” tool, automated reports on public procurement in Belarus can also be generated. 

The other data analytics tool developed, the “Observer” module, is targeted at the general public – citizens, businesses, and civil society – and is intended to ensure transparency of public procurement spending. The Observer tool is made available online and allows users to view the procurement data according to a number of pre-defined indicators, including aspects such as the percentage of competitive procedures and the breakdown of types of goods being procured. In addition, the online reporting system set up, provides measures of public procurement spending over the last week, and extracts facts from the systems which are presented as “stories” regarding aspects such as the percent of tenders won by international suppliers, and the focus of public spending in particular regions.
 
## Development of the data analytics and transparency tools

The EBRD provided support to the Belarus public authorities for the development of the business intelligence tools. This includes not just technical support in relation to the digital tools being used, but support regarding the methodologies to use to calculate the measures of the various procurement procedures. This is done to ensure the proper alignment of the procurement processes followed and the indicators used to measure them.

Following the initial development and delivery of the business intelligence tools, the Ministry had previously unmatched visibility over the eProcurement processes being implemented. On the basis of this it chose to update some of its eProcurement processes. This meant, however, that the business intelligence tools required updating themselves in order to match the revised procedures, delaying the project somewhat.

## Results and future expectations

As a result of the project, Belarus now has a national-level public procurement data analytical infrastructure. This system enables a previously impossible level of vision over procurement spending within the country, and enables various types of big data analysis.
In terms of the goals set for the project, the OCDS-based analytical system:

*	Provides transparency on public spending – through the online “Observer” tool
*	Enables the automated generation of public procurement reports – through the “Explorer” analytical tool 
*	Provides support for public administration regarding public procurement decisions – Government employees are able to use the “Explorer” tool to analyse public procurement data and guide their procurement decisions. 

Evidence that policy makers are making use of the Business Intelligence tools they now have to guide their decisions came with the passing of new legislation on how to deal with procurement complaints. The new system provided evidence regarding the inefficiencies of the existing review and complaints process for public procurement procedures. The new law reforming these procedures was passed as a result of having access to this data.

Going forward, the impact of the project could be increased by allocating resources and budget to training and outreach programmes to promote the use of the business intelligence tools not just within the Ministry of Antimonopoly Regulation and Trade, but in agencies and departments across the Government. The tools and spending data now available, could be used to guide decision-making not just for public procurement specialists but for policy makers across different policy fields.

## Requirements
 
In terms of the human resources required for the project, the EBRD worked with 3 separate consulting and technology firms in order to develop the system. Each of these firms provided expertise in different areas, with one with specialist knowledge on the use of Qlik and business intelligence software, one with expertise in web applications, and the other with expertise in data analysis. 

Other key requirements to perform the project include the existence of digital procurement systems in the first place. However, similar projects can be performed with a wide variety of different types and standards of such eProcurement systems. As mentioned in the costs section above, however, systems with poorly organised databases and poor data quality will require considerably more time and expense in order to perform the necessary data transformation and set up functioning data analytics tools. A final key requirement in order to perform such a project is to have access to people and experts who can explain how the existing databases are set up and what the various data refer to.

## Risk and mitigation 

At the start of the project, one of the risks identified relates directly to the point above – access to the experts who could accurately describe the current state of the existing eProcurement systems and databases. It was not known whether this would be provided, or whether for example the team risked being provided out-of-data information on the systems.

Another major risk faced by the project concerned gaining access to the eProcurement systems and data that was required. With several different public organisations owning the systems and data required, there was a risk of political blocks, with organisations refusing to cooperate with the project. This risk did partially materialise, with the Belarus Universal Commodity Exchange refusing to directly send its data for the OCDS transformation. This led to the need for the data to be extracted via a different source – the Public Procurement Publication Centre, with which the commodity exchange already shared its data.

## Challenges and lessons learnt

The main challenges for the project were related to getting the necessary support from the people and organisations in order to access the necessary systems and data. The assessment of the legacy systems and data transformation is the most challenging phase, and the completion of this task requires internal support and expertise regarding procurement processes and data.
Lessons that can be taken from the project include:

*	The underlying quality of the data is key – bad quality data will drive costs up and reduce the accuracy of the business intelligence tools developed.
*	Plan the project in several phases, providing time for feedback from the Government –Following the initial development of the business intelligence tools, the Ministry decided to change some of its digital procurement processes, on the basis of the evidence that these tools provided. These changes affected the underlying data, meant the business intelligence tools had to be themselves updated, and therefore delayed the project. 
*	Budget for training and outreach should be included – in order to ensure the new tools are understood and used.

