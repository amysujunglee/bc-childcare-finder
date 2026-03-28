import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, name, email, issueType, message } = body;

    if (!name || !email || !issueType || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'BC Childcare Finder <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `[BC Childcare Finder] ${issueType} — from ${name}`,
      text: `New contact form submission\n\nRole: ${role}\nName: ${name}\nEmail: ${email}\nIssue: ${issueType}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
