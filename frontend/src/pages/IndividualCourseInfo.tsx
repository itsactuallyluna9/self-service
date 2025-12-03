import React from 'react';
import { useState } from 'react';
import IndividualCourseTemplate from '../pages/IndividualCourseInfo';

function IndividualCourseInfo() {
    const [courseID, setCourseID] = useState('');

    return (
        <div>
            <IndividualCourseTemplate 
                name='Software Development Processes'
                year='2025-2026'
                seats='9'
                code='CSC 318'
                block='4'
                professor='Ajit Chavan'
                department='Computer Science'
                credits='1'
                feeAmount='0'
                description=''
                prereqs=''
                type=''
            />
        </div>
    );
}

export default IndividualCourseInfo;
