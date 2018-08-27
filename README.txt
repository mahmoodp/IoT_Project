-------------------------
Design
-------------------------
The description of each js file is represented in the following:
  - Gateway.js: get the information of registered data sources and write values to IoT- platform
  - Orchestrator.js: The orchestrator queries to SPARQL server to get the list of existing data source and sends the results to the gateway
  - Device.js: To create class for devicess.
  - Query.js: To create class for historical data.

The data sources are divided into two sub-classes. Devices represent the sensors/actuators on shop floor
and queries indicate historical data that are being retrieved from databases. 
The associated attributes with query class are name, id, dataType,endpoint, protocol and manufacturer.
The associated attributes with device class are name, query, dataType and databaseType.
  - Web Ontology Language (OWL) is used for implementing ontology.
  - The Protégé software was employed to create the ontology model.
  - Fuseki server is used to retrieve/manipulate the data stored in ontologies. 


-------------------------
Implementation
-------------------------

1- Create/Edit OWL file using Protégé(One sample file is uploaded)
 Link to download Protégé -> https://protege.stanford.edu/products.php#desktop-protege

2- Upload dataset into Fuseki Server according to the follwing steps:
   - Download the latest version of Apache Jena Fuseki through the link -> https://jena.apache.org/download/#jena-fuseki
   - Unzip the file and navigate to the root folder.
   - Run the fuseki-server.bat
   - Open Web browser and go to http://localhost:3030/
   - Go to manage datasets tab.
   - Upload the OWL file by pressing add new dataset.
   - Then the ontology model is loaded and is ready to use for sending queries and get results.

   