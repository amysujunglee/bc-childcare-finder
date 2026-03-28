"use client";

import Link from "next/link";
import { Centre } from "@/lib/mock-data";
import Badge from "./Badge";
import { getStarRating } from "@/lib/utils";

interface CentreCardProps {
  centre: Centre;
  onClick?: () => void;
}

export default function CentreCard({ centre, onClick }: CentreCardProps) {
  const { full } = getStarRating(centre.rating);

  return (
    <Link href={`/centre/${centre.id}`} onClick={onClick}>
      <div className="bg-white rounded-card border border-neutral-border hover:shadow-md transition cursor-pointer h-full flex flex-col">
        {/* Image Placeholder */}
        <div className="w-full h-40 bg-gradient-to-br from-primary-green to-primary-dark rounded-t-card flex items-center justify-center">
          <div className="text-white text-4xl opacity-20">
            {centre.name.charAt(0)}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Header with Badge */}
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-serif font-bold text-primary-dark flex-1 text-sm leading-tight">
              {centre.name}
            </h3>
            {centre.tenDollarDay && (
              <Badge variant="accent" size="sm">
                $10/day
              </Badge>
            )}
          </div>

          {/* Address */}
          <p className="text-xs text-neutral-muted mb-3">
            {centre.address}, {centre.city}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <span className="text-xs font-bold text-primary-green">
              {"★".repeat(full)}
            </span>
            <span className="text-xs text-neutral-muted">
              {centre.rating.toFixed(1)}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div>
              <p className="text-neutral-muted font-medium">Schedule</p>
              <p className="text-primary-dark font-medium capitalize">
                {centre.scheduleType.replace("-", " ")}
              </p>
            </div>
            <div>
              <p className="text-neutral-muted font-medium">Spots</p>
              <p className="text-primary-dark font-medium">
                {centre.spotsAvailable > 0 ? centre.spotsAvailable : "Full"}
              </p>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-3">
            <p className="text-xs text-neutral-muted font-medium mb-1">
              Languages
            </p>
            <div className="flex flex-wrap gap-1">
              {centre.languages.slice(0, 2).map((lang) => (
                <Badge key={lang} variant="secondary" size="sm">
                  {lang}
                </Badge>
              ))}
              {centre.languages.length > 2 && (
                <Badge variant="secondary" size="sm">
                  +{centre.languages.length - 2}
                </Badge>
              )}
            </div>
          </div>

          {/* CTA */}
          <button className="mt-auto w-full bg-primary-green hover:bg-opacity-90 text-white text-xs font-medium py-2 rounded-card transition">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
