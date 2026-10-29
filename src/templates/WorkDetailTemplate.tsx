import Link from 'next/link';
import { Acc } from '@/components/ui/Acc';
import { ProjectArt } from '@/features/work';
import type { Project } from '@/lib/content';

export function WorkDetailTemplate({ project }: { project: Project }) {
  return (
    <article className="detail-page work-detail">
      <div className="detail-in">
        <p className="eyebrow">
          <Link href="/#work">Selected work</Link>
          <span aria-hidden="true"> · </span>
          {project.industry}
        </p>
        <h1>
          {project.title}
          <span className="sr"> — GREYZONE</span>
        </h1>
        <p className="detail-lede">
          {project.sub} · {project.year}
        </p>
        <div className="detail-art" aria-hidden="true">
          <ProjectArt id={project.artSvgId} />
        </div>
        <p className="detail-result">
          <Acc>Result.</Acc> {project.result}
        </p>
        <p>
          <Link className="detail-cta" href="/#contact">
            Start a project
          </Link>
        </p>
      </div>
    </article>
  );
}
