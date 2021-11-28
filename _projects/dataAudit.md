---
title: Data Audit Tool
order_number: 1
images: ['dataAuditWireframe.png', 'dataAuditInUse.png']
images_alt: ['A wireframe documenting what the Data Audit Tool could look like', 'An in-use screen shot of the Data Audit Tool with real life pedestrian count data']
summary: "Across North Carolina are hundreds of sensors installed to count pedestrians and bicyclists. When these malfunction, the counts that get sent back can range from subtly to wildly inaccurate. Planning decisions get made using this data, so these errors need to be caught, flagged, and removed from officially released count reports. The data audit tool is one module of the Non-Motorized Count Assurance Tool (NMCOAST) that provides a graphical overview of incoming sensor counts and allows auditors to review flagged data and flag data themselves."
tech: "I developed an API using Node.js to query count data and equipment data from a MySQL database. The count data was graphed using Canvas.js. Vanilla JavaScript was used to add interactivity for selecting counting locations, sensors, and the date range of data to display. Wireframing was completed using Sketch."
challenge: "At one point, graphs didn't visually indicate invalid days or days flagged as needing review. User feedback determined that this was an important feature, so I set off to make that happen. After digging through the Canvas.js documentation for custom tooltips I found a solution that could work. This required continuously crafting and refining SQL queries to keep load times minimal, but with plenty of collaboration with the team's MySQL expert, we were able to get what we needed."
---


