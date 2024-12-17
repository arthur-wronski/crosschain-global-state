import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { primaryChain, secondaryChain, functionToCopy, contract } = await request.json();

    if (!primaryChain || !secondaryChain || !functionToCopy || !contract) {
        return NextResponse.json(
            { message: 'Missing required fields' }, 
            { status: 400 }
        )
    }

    console.log('Deployment request received:', {
    primaryChain,
    secondaryChain,
    functionToCopy,
    contract,
    });

    return NextResponse.json(
        { message: 'Deployment successful' },
        { status: 200 }
    )
}