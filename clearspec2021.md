# ClearSpec 2021

Provide clarity in W3C products
 
 Note: there is an overarching issue created for this project at
 https://github.com/w3c/tr-pages/issues/90

# Goals

1. Help the public to differentiate among documents produced by W3C Groups (W/I/B/C).
1. Establish W3C Recommendations as the sole W3C Web standards (in comparison to other types of W3C documents)
1. document and inform about the level of adoption of various documents, including our standards.

# Audience

1. devrel advocates
1. web developers
1. implementers
1. general public

# What use cases are we trying to solve?

1. Talking to the public about the document: "Time to experiment", "Time to comment", "Time to adopt", "mature", "new", "done, "not done"
1. Spec editors creating references to W3C documents (stable, point in the general direction, etc.)
1. Product manager use case: what to use?
1. Users / developers who ask browser vendor "why aren't you implementing this technology?"

(Projects below are ordered by priority)

# Project #1

Reestablish the expectations for Community Group documents and how we apply/enforce them
Address CG reports and ongoing proposals

1. Revisit CG sample as needed
  1. https://www.w3.org/community/src/css/spec/sample
  1. https://www.w3.org/community/reports/reqs/
     e.g. s/Draft Report/Proposal/ ? (RRS: maybe not all "reports" are envisioned to become "proposals".)
     s/Proposal/Incubation/
     Note: we'll need a proper design lead.
  1. Revive and improve CG reports listings
     we have some of that information
     we need a clear value to motivate the CGs.
     current system is obsolete
  1. Consider establishing proposals.w3.org
     maybe aligned with https://pad.w3.org/p/group-editors-draft
     e.g. https://proposals.w3.org/wicg/background-fetch
     [RRS: would this differ from drafts.w3.org proxy for github.io/w3c/  (project 4)?  If so, how?]
  1. Run checks in background on CG reports/proposals
     a limited pubrules only intended to alert devrel on misbehaviors
  1. Provide a reporting system to the community to report confusion  


We'll start with WICG to refine the proposal before circulating with spec-prod and CG chairs

https://wicg.github.io/tracking.html

We need 2 months to refine the proposal and one month to deploy

Note: #3 cannot be implemented in April/May
 
ETA:
 1, 2, 4, 5 can be done within 3 months
 3 can be done in June/July (needs Jean-Gui/Denis)

 (interested: Judy, Ralph, Dom?)

# Project #2

Document and inform about the level of adoption of various documents, including our standards

1. Refine the metrics to be used and exposed. Gather implementation level, intent to implement, [community adoption](https://dontcallmedom.github.io/adoption-monitor/).
     Work with Mike, MDN (Dom, Joe Medley) and mobile roadmap (Dom/Francois) to refine proposal
1. Establish how we'll carry annotations in /TR documents and implement. Reuse/enhance existing respec/bikeshed infrastructure
1. Provide a general picture on the level of implementation to our browser-related specifications (present at AC Meeting 2021?)
1. Establish guidance on how to increase implementation experience.
     Poll the Working Groups on implementation experience challenges.
     browser vs non-browser implementation [RRS: are polyfills different from "browser"?]
1. Consider extending this beyond browser implementations (ie going beyond MDN)

# Project #3

1. Differentiate /TR documents: URL, style, listings, versioning
  Modest revision of templates for W3C documents published on /TR
    Look at
     https://rawgit.com/w3c/tr-design/versioning/versions-proposal.html
     https://medium.com/jefferson-w3c-collaboration
  For a major design, we should follow:
    https://github.com/w3c/tr-design/blob/gh-pages/README.md#guidelines-for-a-proper-design
    Major redesign should be part of W3C Relaunch.
       Note: we'll need a proper design lead for a major redesign.
  For minor changes (tweaks of CSS), we can do so more easily
    eg changing the color of the "W3C Recommendation" logo

1. Revisit latest/upcoming/ed and revise specref (PLH, Dom, Denis)
  Include: Comm, Shawn

ETA:
 for modest change, we can do so within 3 months
   Note: Denis must not be expected until June
 for major change, the current workflow would mean January 1, 2022, as part
   of W3C relaunch.

# Project #4

Better referencing of editor's drafts (ie move away from citing github.io URIs). drafts.w3.org proposal

1. Refine proposal
      https://pad.w3.org/p/group-editors-draft
   2 months
1. Implement
  June/July (needs Jean-Gui/Denis)
1. Report on delays eds vs trs
  eg TR is 3 years behind the editor's draft
   
See also https://github.com/w3c/w3process/issues/435
   
Involves: Fantasai

# Project #5

Nomenclature and Naming

1. Refine classification and text at
     https://w3c.github.io/tr-pages/documents.html
    (merge category 1 & 2)

1. Push the classification and text into /TR
     (this should remain minimal)

1. Revisit https://www.w3.org/standards/
   https://www.w3.org/standards/faq
   (this should remain minimal)
       (maybe merged with 4)
       should we contribute to
         World Wide Web Consortium - Wikipedia ?

1. Work with website redesign project to further adopt the classification
      in public pages
       /TR listing
        Consider pushing Notes off the default view of /TR?
        [RRS: if so, please make a convenience URI for all (current) Notes]

1. Loopback to the W3C Process (2022?)

 ETA: 3 months
    4 needs to be ready by May if done
    Needs to be worked on with Dom, Denis

# Timeline

1. Global - January 28
1. Week of Feb 1st: twitter, spec-prod, WICG Chairs, chairs, CCG, ...
1. AB: Feb 18?
1. AC forum: Feb 22 or March 1 (or sooner if AB can't do Feb 18)
