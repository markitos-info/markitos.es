import PropTypes from "prop-types";

const YoutubeEmbed: React.FC<Record<string, string>> = (
  props: Record<string, string>,
) => (
  <div className="video-responsive">
    <iframe
      style={{
        borderColor: "#434D5B",
        border: "1px solid #434D5B",
        borderRadius: "8px",
      }}
      width="97%"
      height="480px"
      src={props.embedId}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
      allowFullScreen
      title={props.title}
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
