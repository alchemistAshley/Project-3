import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import styled from 'styled-components';
import './Dashboard.css';
import Button from '../../components/Button';
import PlanCard from '../../components/PlanCard/PlanCard';
import ProfileSnippet from '../../components/ProfileSnippet/ProfileSnippet';
import API from '../../utils/api';
// import { getMaxListeners } from 'cluster';


const CreateButton = Button.extend`
    margin-top: 2em;
    margin-left: 1.5em;
    margin-right: 1.5em;
    margin-bottom: 2em;
    width: 85%;
`;

class HomePage extends Component {

    state = {
        plans: {
            plan1: {
                title: 'Barbados Trip',
                location: 'Barbados',
                date: '8/02/18',
                _id: 'xklfjhg293879584'
            },
            plan2: {
                title: 'Donald Relaxation',
                location: 'Costa Rica',
                date: '8/08/18',
                _id: '239875498798df'
            }
        },
        plansArray: [],
        clickedPlan: {},
        loadPlan: false,
        currentUser: 'Walker',
        currentUserProfile: {
            email: 'email@gmail.com',
            username: 'defaut username',
            name: 'default user'
        }
    }

    componentDidMount = () => {
        this.getUserPlans()
    }

    createPlan = () => {

        API.postPlan({
            title: '',
            location: '',
            members: [this.state.currentUser]
        })
        .then(res => {
            <Redirect to={'/planit/' + res._id}  />
        })
        .catch(err => console.log(err))

    }

    fetchProfileInfo = () => {

        API.getUser(this.state.currentUser)
        .then( user => this.setState({
            currentUserProfile: user
        }))
        .catch(err => console.log(err))
        
    }

    loadPlan = id => {

        console.log('clicked ' + id)

        API.getPlanByID(id)
        .then(plan => {
            console.log('hit the .then')
            this.setState({
            clickedPlan: plan,
            loadPlan: true
            })
            if( this.state.loadPlan ) {
                <Redirect to={'/planit/' + plan._id}  />
            }
        })
        //add another .then to load the plan page with the specific cleckedPlan planID
        .catch(err => console.log(err))

    }

    getUserPlans = () => {

        const plans = this.state.plans

        // for( let onePlan in plans ) {

        //     console.log(plans[onePlan])

        // }

        API.getAllUserPlans('Walker')
        .then(plans => {

            for( let onePlan in plans ) {

                console.log(plans[onePlan])

            }

            this.setState({
            plans: plans
        })
    })
        .catch(err => console.log(err))
        
    }

    render () {

        //<PlanCard title={plan.title} location={plan.location} id={plan._id} date={plan.date} clicked={this.loadPlan} />


        
        return (
            <div className='container clearfix'>
                <div className='leftPanel'>
                    <ProfileSnippet profile={this.state.currentUserProfile}/>
                    <div>
                        <CreateButton onClick={this.createPlan}>
                            Create a new plan
                        </CreateButton>
                    </div>
                </div>
                <div className='cardPanel'>
                    
                </div>
            </div>
        );
    }
}

export default HomePage;