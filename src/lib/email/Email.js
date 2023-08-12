import {
    render,
    Mjml,
    MjmlHead,
    MjmlTitle,
    MjmlPreview,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlText,
    MjmlHero,
    MjmlButton
} from 'mjml-react';

export default function renderClientOrderEmail({
    client,
    auther,
    description,
    resume
}) {
    const title = `You have got an email from ${client}`;

    return render(
        <Mjml>
            <MjmlHead>
                <MjmlTitle>{title}</MjmlTitle>
                <MjmlPreview>{title}</MjmlPreview>
            </MjmlHead>

            <MjmlBody width={500}>

                <MjmlSection fullWidth>
                    <MjmlColumn>
                        <MjmlText>Hi, <MjmlHero></MjmlHero>{auther}</MjmlText>

                        <MjmlText>
                            {client}, has registered on your website.
                        </MjmlText>

                        <MjmlText>
                            About {client}
                        </MjmlText>

                        <MjmlText>
                            {description}
                        </MjmlText>
                    </MjmlColumn>
                </MjmlSection>

                <MjmlSection>
                    <MjmlColumn>
                        <MjmlButton href={resume} rel="noopener noreferrer" target="_blank">
                            View User Resume
                        </MjmlButton>
                    </MjmlColumn>
                </MjmlSection>

                <MjmlSection>
                    <MjmlColumn>
                        <MjmlText></MjmlText>
                    </MjmlColumn>
                </MjmlSection>
            </MjmlBody>
        </Mjml>,
        { validationLevel: 'soft' }
    );
}
