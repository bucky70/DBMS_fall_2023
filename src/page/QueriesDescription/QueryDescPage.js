import classes from "./QueryDescPage.scss"

const QueryDescPage = () => {
    return (
        <div className="QueriesContainer">

            <h2> Analyzing and Visualizing Trends in Car Accidents Across the United States </h2>
            <br/>
            <ul>
                <li class="OddListItem"> <br/> <h5> <a href = "http://localhost:3000/weather-condition" title="Weather Condition">1. How does the weather condition (rain, snow, thunderstorm, fog etc.) affect the accident frequency and severity over time in different states or regions of the US? </a> </h5> <br/> 
                <p>This complex SQL query analyzes car accident data, specifically focusing on the impact of weather conditions in different cities and states across various years. The query retrieves information such as the number of accidents, average severity, and percentage differences in both accident frequency and severity compared to regional averages. It considers factors like weather conditions, city, state, and the year of the incidents. The goal is to identify patterns, trends, and deviations in accident rates and severity, providing valuable insights into the correlation between weather conditions and car accidents in different locations and over time. The results are presented in a structured format, ordered by year, state, city, and weather condition for ease of analysis.
                </p>
                </li>

                <li> <br/> <h5> <a href="http://localhost:3000/covid-epidemic" title=""> 2. How have accidents changed over time in various US states or areas, and what impact did the COVID epidemic have on traffic incidents? </a> </h5><br/> 
                <p>This SQL query delves into the analysis of car accidents across different states, considering the impact of the COVID-19 pandemic. It categorizes incidents based on whether they occurred during the years 2020, 2021, or 2022, labeling them as 'Yes' or 'No' for COVID_Status. The query retrieves key metrics such as the number of accidents, average severity, and the percentage difference from the average in both accident frequency and severity. The goal is to discern patterns and variations in accident rates and severity across states during the specified years. The results are organized by year and state, facilitating a comprehensive overview of the data and its insights into the relationship between the pandemic and car accidents in different regions.
                </p>
                </li>



                <li class="OddListItem"> <br/> <h5> <a href="http://localhost:3000/seasons-impact" title=""> 3. How does the incident occurrence rate and severity vary over time in different states or regions of the United States due to seasonal changes, such summer and winter </a> </h5> <br/> 
                <p>This query sorts car accidents in the United States by seasons—Winter, Spring, Summer, and Fall—based on their occurrence months. It calculates total incidents, the percentage for each month, and the deviation from the average monthly incident count. Additionally, it offers insights into the average severity of incidents and the percentage difference in severity from the monthly average. The query aims to uncover patterns and variations in accident rates and severity across seasons and months, contributing to a detailed understanding of the seasonal dynamics of car accidents.
                </p>
                </li>



                <li> <br/> <h5> <a href="http://localhost:3000/population-density" title=""> 4. Analyze how the frequency and severity of incidents vary based on population
density (across various cities) over time? </a> </h5><br/> 
                <p>This query looks at car accident data in different cities and states, considering the population density. It calculates how often accidents happen, the average severity, and the percentage differences in both accident frequency and severity compared to the usual numbers. It specifically looks at the population density of each city, considering variations across different years. The aim is to find patterns and differences in accident rates and severity related to population density. The results give insights into how population density affects car accidents, helping understand safety trends in various urban areas over time.
                </p>
                </li>



                <li class="OddListItem"> <br/> <h5>  <a href="http://localhost:3000/road-features" title=""> 5. How do the different types of road features (such as amenity, bump, crossing,
junction, traffic signal, etc.) affect the frequency or severity of accidents over time
in different states or counties? </a> </h5><br/> 
                <p>This query extracts information about different road types and their impact on car accidents, focusing on each state and year. It categorizes road types such as 'Bump,' 'Crossing,' 'Junction,' 'Roundabout,' 'Give_way,' 'No_exit,' 'Railway,' 'Station,' 'Stop,' 'Traffic_signal,' and 'Turning_loop.' For each road type, it calculates the average severity of incidents and the count of occurrences. The goal is to identify patterns and variations in accident severity related to specific road types across different states and years. The results provide valuable insights into the safety dynamics associated with different road configurations.
                </p>
                </li>



                <li> <br/> <h5> <a href="http://localhost:3000/frequent-hours" title=""> 6. What are the most frequent hours for accidents in different areas? </a> </h5><br/> 
                <p>This query retrieves data on the number of incidents in different cities and states, broken down by the hour of the day. It utilizes the Incident and Incident_times tables, joining them based on the Incident_ID. The results are grouped by City, State, and the hour extracted from the StartTime. The count of incidents is calculated for each group, and the output is ordered in descending order based on the number of incidents. The query aims to provide insights into the distribution of incidents across hours in various cities and states.
                </p>
                </li>
            </ul>
        </div>

    )
}

export default QueryDescPage;