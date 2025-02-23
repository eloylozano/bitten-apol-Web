"use client";

import styled from "styled-components"
import Center from "./Center"



const Bg = styled.div`
    background-color: #222;
    color: white;
    padding: 50px 0;
`

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
`

const Desc = styled.p`
    color: #aaa;
`

export default function Featured() {
    return (
        <Bg>
            <Center>
                <Title>Pro AnyWhere</Title>
                <Desc>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto tempore deleniti autem dolor nemo quaerat facere. Ratione, itaque nam accusamus consectetur nulla recusandae fugit velit laboriosam dolores neque quae cupiditate.</Desc>
            </Center>
        </Bg>
    )
}