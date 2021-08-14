import React, { FC } from 'react'
import type { WithChildren } from '../../types'

import { Link } from '../Link'

import './index.scss'

interface Step {
    [id: string]: {
        breadcrumb: string
        key: string
    }
}

export interface BreacrumbProps extends WithChildren {
    history: object
    className?: string
    steps: Step[]
    step: string
    url?: string
    noLinkAfterId?: string | number
}

function Breadcrumb({ url, step, steps, noLinkAfterId, history }: BreacrumbProps) {
    const entries = steps instanceof Object && Object.entries(steps)

    if (!entries?.length) return null

    const currentId = entries?.find(([id, { key }]) => [id, key]?.includes(step))?.[0]

    const lastStepId = entries?.[entries?.length - 1]?.[0]

    const percentPerStep = 100 / entries.length
    let percent = percentPerStep / 2

    if (currentId === lastStepId) {
        percent = 100
    } else {
        percent += percentPerStep * (parseInt(currentId, 10) - 1)
    }

    let Tag: FC | 'div' = url ? Link : 'div'

    return (
        <>
            <div className="height-100" />
            <div className="breadcrumb absolute bottom-0 left-0 right-0 ph-4vw pv-20">
                <div
                    className="border flex justify-space-between sm-:flex-wrap"
                    style={{ '--percent': percent }}
                >
                    {entries
                        .map(([stepId, { breadcrumb = null, key = null } = {}]) => {
                            if (!breadcrumb) return null

                            const placement = Math.sign(
                                parseInt(stepId, 10) - parseInt(currentId, 10),
                            )

                            if (parseInt(stepId, 10) > parseInt(`${noLinkAfterId}`, 10)) {
                                Tag = 'div'
                            }

                            return (
                                <Tag
                                    key={stepId}
                                    to={Tag === Link && `/${url}/${key || stepId}`}
                                    className="step pt-20"
                                    history={Tag === Link && history}
                                >
                                    <span
                                        className={`body-14 mr-4 ${
                                            placement <= 0 ? 'step-passed bold' : 'medium'
                                        }`}
                                    >
                                        {stepId}
                                    </span>
                                    <span
                                        className={`body-14 ${
                                            placement === 0 ? 'step-current bold' : 'medium'
                                        }`}
                                    >
                                        - {breadcrumb}
                                    </span>
                                </Tag>
                            )
                        })
                        ?.filter((e) => !!e)}
                </div>
            </div>
        </>
    )
}

export default Breadcrumb
