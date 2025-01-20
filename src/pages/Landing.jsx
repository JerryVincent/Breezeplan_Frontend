import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Landing() {

  return (
    <>
        <div
          className="d-flex align-items-center justify-content-center mt-5 border border-primary rounded"
          style={{
            height: '70vh',
            background:
              'url(https://media4.giphy.com/media/xTiTnGmU99wLFvZBfy/200.webp?cid=ecf05e4792tfay07el59eyb5akbsx9h3g5onog65z4re0uhh&ep=v1_gifs_search&rid=200.webp&ct=g)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="p-3 p-md-5">
            <Card>
              <Card.Header className="text-warning fs-10x shadow">Breezeplan</Card.Header>
              <Card.Body>
                <Card.Title>
                  What <span className="text-info">Breezeplan</span> Does?
                </Card.Title>
                <Card.Text style={{ textAlign: 'justify' }}>
                  With Breezeplan you can plan your Outdoor Activities without any tensions. Based on accurate weather
                  information, Breezeplan gives you all the possible outdoor activities that you can engage in. We might need some of your information just for the purpose of analysis. We are not storing your data. So why
                  wait, get started and engage in your favorite sports activities.
                </Card.Text>
                <Link to={'/Getsuggestion'}><Button variant="primary">
                  Explore Breezeplan
                </Button></Link>
              </Card.Body>
            </Card>

          </div>
        </div>
        
    </>
  );
}

export default Landing;
