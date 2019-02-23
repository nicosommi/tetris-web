import { css, keyframes } from "@emotion/core"
import styledNative from "@emotion/native"
import styled, { CreateStyled } from "@emotion/styled"
import React from "react"
import { isWeb } from "./debug"

const g: CreateStyled<any> = isWeb() ? styled : styledNative

export { React, g, css as getClassNameFromObject, keyframes }
