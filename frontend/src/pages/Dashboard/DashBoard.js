import React from 'react'
import Chart from '../../components/Chart/Chart.jsx'
import './DashBoard.css'
import FeatureInfor from '../../components/FeatureInfor/FeatureInfor.jsx'
import FeatureInfo1 from '../../components/FeatureInfor/FeaturedInfo1.jsx'
import FeatureInfo2 from '../../components/FeatureInfor/FeaturedInfo2.jsx'
import { salesData } from '../../utils/graphData.js'

const DashBoard = () => {
    // const [data, setdata] = useState("")
    return (
        <div className ="rootApp" >
             <div className='fetqured'>
            <FeatureInfor/>
            </div>
            <div className='fetqured'>
            <FeatureInfo1/>
            </div>
            <div className='fetqured'>
            <FeatureInfo2/>
            </div>
            <div className ="homeWidgets">
                {/* <WidgetSmall/> 
                <WidgetLarge/>  */}
            </div>
        </div>
    )
}

export default DashBoard
