import { CheckIcon } from "lucide-react";

export default function PreviewGradient() {
  return (
    <section className="py-24 lg:pb-32 overflow-hidden text-neutral-50 bg-black">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <h2 className="mb-4 text-6xl tracking-tighter">Pricing &amp; Plans</h2>
          {/* <p className="text-xl tracking-tight">
            Use and reuse tons of responsive sections to create the perfect layout. Sections are ready.
          </p> */}
        </div>
        <div className="flex flex-wrap -m-4 *:mx-auto">
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="h-[400px] flex flex-col bg-white dark:bg-neutral-800 border border-neutral-300 rounded-2xl transform-gpu hover:-translate-y-2 transition duration-500">
              <div className="p-12 border-b border-neutral-300 dark:border-neutral-800">
                <div className="pr-9">
                  <h4 className="mb-4 text-6xl tracking-tighter">1 month</h4>
                  <p className="-mb-20 text-xl font-semibold tracking-tight">From &#8377; 29 for 30 days</p>
                </div>
              </div>
              <div className="p-10 pb-6 flex-grow flex flex-col">
                <ul className="-m-1.5 mb-10 flex-grow">
                  <FeatureItem>Curated job listing matching to your resume</FeatureItem>
                  <FeatureItem>10 job openings per day</FeatureItem>
                  <FeatureItem>Shorter Plan</FeatureItem>
                </ul>
                <PricingButton noCardRequired={true}>Pay Now</PricingButton>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-2">
            <div className="h-[400px] flex flex-col p-px overflow-hidden rounded-2xl hover:-translate-y-2 transition duration-500 transform-gpu"
              style={{
                backgroundImage: "url('/background-image/advanced-gradient.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}>
              <div className="h-full flex flex-col bg-white dark:bg-neutral-800 border border-neutral-300 rounded-2xl transform-gpu hover:-translate-y-2 transition duration-500">
                <div className="p-12"
                  style={{
                    backgroundImage: "url('/background-image/advanced-gradient.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}>
                  <div className="pr-9">
                    <h4 className="mb-1 text-6xl text-white tracking-tighter">3 Months</h4>
                    <p className="-mb-20 text-xl text-white font-semibold tracking-tighter">
                      From &#8377; 69 for 90 days
                    </p>
                  </div>
                </div>
                <div className="p-12 pb-11 flex-grow flex flex-col">
                  <ul className="-m-1.5 mb-10 flex-grow">
                    <FeatureItem>Unlimited Projects</FeatureItem>
                    <FeatureItem>Project Schedule</FeatureItem>
                    <FeatureItem>150+ Integrations</FeatureItem>
                  </ul>
                  <PricingButton noCardRequired={true}>Pay Now</PricingButton>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureItem = ({ children }) => {
  return (
    <li className="flex items-center py-1.5">
      <CheckIcon className="size-3 mr-3" />
      <span className="font-medium tracking-tight">{children}</span>
    </li>
  );
};

const PricingButton = ({ children, href, noCardRequired }) => {
  return (
    <>
      <a className="inline-block px-5 py-4 w-full text-center font-semibold tracking-tight bg-transparent hover:bg-neutral-900 hover:text-white border dark:hover:bg-white dark:hover:text-neutral-800 hover:scale-105 border-neutral-700 rounded-lg transition duration-200"
        href={href ?? ""}>
        {children}
      </a>
      {noCardRequired && (
        <span className="text-sm text-neutral-600 tracking-tight">
          No credit card required
        </span>
      )}
    </>
  );
};
