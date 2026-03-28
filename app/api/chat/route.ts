import { NextRequest, NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';
import { centres } from '@/lib/mock-data';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context = '' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build the system prompt with centre data
    const centresData = JSON.stringify(
      centres.map((c) => ({
        id: c.id,
        name: c.name,
        city: c.city,
        ageGroups: c.ageGroups,
        languages: c.languages,
        scheduleType: c.scheduleType,
        tenDollarDay: c.tenDollarDay,
        phone: c.phone,
        email: c.email,
      })),
      null,
      2
    );

    const systemPrompt = `You are a helpful assistant for BC Childcare Finder. Help parents find the right daycare for their child in BC, Canada. You have access to the list of centres and can answer questions about fees, schedules, age groups, $10/day programs, and general childcare advice in BC.

Here is the current list of available centres:

${centresData}

${context ? `Additional context: ${context}` : ''}

Be friendly, helpful, and provide accurate information based on what you know about the centres. If parents ask about specific requirements, help them find matching options based on age groups, languages, schedule types, or $10/day eligibility. Encourage them to contact centres directly for specific details about fees, current availability, and enrollment.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    // Extract the text response
    const firstBlock = response.content[0];
    const assistantMessage =
      firstBlock && firstBlock.type === 'text' ? firstBlock.text : '';

    return NextResponse.json({
      message: assistantMessage,
      role: 'assistant',
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
