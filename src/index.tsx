import * as React from "react";
import * as ReactDOM from "react-dom";

import { RenderPortal } from "./components/RenderPortal";
import { createSurvey } from "./Survey";
import { SurveyStats } from "./SurveyTable/SurveyStats";
import { SurveyTable, SurveyTableProps } from "./SurveyTable";
import { OrderedMap } from "immutable";

import './style.scss';
import { SurveyGen, SurveyGenDefinition, SurveyGenProps } from "./SurveyGen";

const structureSurveyTable = {
    title: 'Dummy Title Overwritten by JSON Props',
    questionHeader: [
        '',
        '😀',
        '😞'
    ],
    questions: [
        {
            id: 'table_q_1',
            label: 'Is that good?'
        }, {
            id: 'table_q_2',
            label: 'You like this?'
        }, {
            id: 'table_q_3',
            label: 'Any more of those?'
        }, {
            id: 'table_q_4',
            label: 'That looks nice, doesn\'t it?'
        }
    ]
};

const structureSurveyGen: SurveyGenDefinition = {
    title: 'Choose your Favorites!',
    questions: [
        {
            id: 'fav_no_1',
            label: 'Numbers from 1 to 5?',
            type: 'rating',
            min: 1,
            count: 5,
            result: {}
        }, {
            id: 'fav_no_2',
            label: 'Numbers from 5 to 9?',
            type: 'rating',
            min: 5,
            count: 5,
            result: {},
            showIf: {
                fav_no_1: v => v > 0
            }
        }, {
            id: 'fav_hearts',
            label: 'Hearts?',
            type: 'rating_heart',
            result: {}
        }, {
            id: 'fav_stars',
            label: 'Stars?',
            type: 'rating_star',
            result: {}
        }, {
            id: 'fav_emojis',
            label: 'Emojis?',
            type: 'rating_emoji',
            result: {}
        }, {
            id: 'fav_num_select',
            label: 'How much do you do?',
            type: 'number',
            result: {}
        }, {
            id: 'fav_num_select2',
            label: 'How many children do you have?',
            type: 'number',
            result: {}
        }, {
            id: 'fav_color',
            label: 'What is your favorite cocktail?',
            type: 'string',
            result: {}
        }, {
            id: 'fav_comment',
            label: 'Some wish?',
            type: 'text',
            result: {}
        }
    ]
};

const CustomSurveyTable = (props: SurveyTableProps) => {
    const store = createSurvey(OrderedMap({}));
    return <SurveyTable {...structureSurveyTable} {...props} store={store}>
        <SurveyStats questions={structureSurveyTable.questions}/>
    </SurveyTable>;
};

const CustomSurvey = (props: SurveyGenProps) => {
    const store = createSurvey(OrderedMap({}));
    return <SurveyGen {...props} {...structureSurveyGen} store={store}/>;
};

const App = () => {
    return <>
        {/* @ts-ignore */}
        <RenderPortal selector={'.pwa-survey'} Component={CustomSurvey}/>
        {/* @ts-ignore */}
        <RenderPortal selector={'.pwa-survey-table'} Component={CustomSurveyTable} clear/>
    </>;
};

ReactDOM.render(
    <App compiler="TypeScript" framework="React"/>,
    document.getElementById("root")
);