import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Interfaces',
        Svg: require('@site/static/img/typescript.svg').default,
        description: (
            <>
                DHIS2 resources interfaces designed to bring type safety while working with DHIS2 API
            </>
        ),
    },
    {
        title: 'Utilities & Functions',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                Reusable functions and utilities to make your life easier when working with DHIS2 API
            </>
        ),
    },
    // {
    //     title: 'Constants',
    //     Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    //     description: (
    //         <>
    //             DHIS2 related constants
    //         </>
    //     ),
    // },
];

function Feature({title, Svg, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img"/>
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div style={{ justifyContent: "center"}} className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
