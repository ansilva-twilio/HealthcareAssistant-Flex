import React, { useEffect, useState } from 'react';
import { useFlexSelector } from '@twilio/flex-ui';
import { Text, Card, Heading, Paragraph, Anchor, Box } from '@twilio-paste/core';

import HealthcareCRMService from '../../utils/HealthcareCRMService';
import AppState from '../../../../types/manager/AppState';

export const CRMContainer = () => {
  const [doctorNotes, setDoctorNotes] = useState('');
  const [patientName, setPatientName] = useState('');

  const tasks = useFlexSelector((state: AppState) => state.flex.worker.tasks);

  // Only render new containers for tasks without a parent task
  const tasksFiltered = Array.from(tasks.values()).filter((task) => !task?.attributes?.parentTask);
  const selectedTask = tasksFiltered[0];

  useEffect(() => {
    if (selectedTask?.attributes?.syncObjSid) {
    console.log('Fetching Doctor Notes for ' + selectedTask?.attributes?.syncObjSid);
      HealthcareCRMService
        .fetchDoctorNotes(selectedTask?.attributes?.syncObjSid)
        .then((notes: any) => {
          setDoctorNotes(notes?.summary);
          setPatientName(`${notes?.firstName ?? notes?.first_name} ${notes?.lastName ?? notes?.last_name}`);
        });
      }
  }, [tasks]);

  // Render for only the filtered tasks as well as an instance for when there is no task selected
  if (selectedTask) {
    return (
      <Box style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        <Text as="div" textAlign="center">
          <img style={{ width: 275, margin: 20, borderRadius: 4, marginTop: 60, marginLeft: 'auto', marginRight: 'auto' }}
              src={`${HealthcareCRMService.serverlessUrl}/features/healthcare-crm-container/medclaim-logo.png`} />
        </Text>
        <Box style={{ margin: 20 }}>
          { patientName && 
            <Card>  
              <Heading as="h2" variant="heading20">{ patientName }</Heading>
              <Paragraph>
                { doctorNotes }
              </Paragraph>
              <Paragraph marginBottom="space0">— <Anchor href="#">Dr. Hanz Schukrutz</Anchor></Paragraph>
            </Card> 
          }
          { !patientName &&   
            <Card>  
              <Text as="div" textAlign="center">
                <Paragraph>
                  <span style={{ color: '#aaa', fontStyle: 'italic', fontSize: 'large' }}>Patient data was not found.</span>
                </Paragraph>
              </Text>
            </Card> 
          }
        </Box>
      </Box>
    );
  } else { 
    return (
      <Box style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        <Text as="div" textAlign="center">
          <img style={{ width: 275, margin: 20, borderRadius: 4, marginTop: 300, marginLeft: 'auto', marginRight: 'auto' }}
                src={`${HealthcareCRMService.serverlessUrl}/features/healthcare-crm-container/medclaim-logo.png`} />
        </Text>
        <Text as="div" textAlign="center">
          <Paragraph>
            <span style={{ color: '#bbb', fontFamily: 'monospace', fontSize: 'large', fontStyle: 'italic'}}>Where technology meets compassion.</span>
          </Paragraph>
        </Text>
      </Box>
      );
  }
};
