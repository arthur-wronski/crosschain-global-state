import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { primaryChain, secondaryChain, functionsToCopy, contract } = await request.json();

    if (!primaryChain || !secondaryChain || !functionsToCopy || !contract) {
        return NextResponse.json(
            { message: 'Missing required fields' }, 
            { status: 400 }
        )
    }

    console.log('Deployment request received:', {
    primaryChain,
    secondaryChain,
    functionsToCopy,
    contract,
    });

    return NextResponse.json(
        { message: 'Deployment successful' },
        { status: 200 }
    )
}